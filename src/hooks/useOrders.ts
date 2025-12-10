import { useEffect, useState } from "react";
import { fetchOrder, fetchOrders } from "../api/order.api";
import { OrderDetailItem, OrderListItem } from "../models/order.model";

// API 응답이 누락/스네이크 케이스여도 합계와 대표상품명을 채워서 렌더링이 깨지지 않게 정규화한다.
const normalizeOrder = (order: any): OrderListItem => {
    const detail = order.detail;

    const totalQuantity =
        order.totalQuantity ??
        order.total_quantity ??
        (Array.isArray(detail)
            ? detail.reduce((sum: number, d: any) => sum + (d?.quantity ?? 0), 0)
            : undefined) ??
        0;

    const totalPrice =
        order.totalPrice ??
        order.total_price ??
        (Array.isArray(detail)
            ? detail.reduce(
                  (sum: number, d: any) => sum + (d?.price ?? 0) * (d?.quantity ?? 0),
                  0
              )
            : undefined) ??
        0;

    const bookTitle =
        order.bookTitle ??
        order.firstBookTitle ??
        order.first_book_title ??
        (Array.isArray(detail) && detail.length > 0 ? detail[0]?.title : "");

    return {
        ...order,
        totalQuantity,
        totalPrice,
        bookTitle,
        detail,
    };
};

export const useOrders = () => {
    const [orders, setOrders] = useState<OrderListItem[]>([]);
    const [selectItemId, setSelectedItemId] = useState<number | null>(null);
    
    useEffect(() => {
        fetchOrders().then((orders) => {
            setOrders(orders.map((order: any) => normalizeOrder(order)));
        });
    }, []);

    const selectOrderItem = (orderId: number) => {
        const target = orders.find((item) => item.id === orderId);

        if (target?.detail) {
            setSelectedItemId(orderId);
            return;
        }

        fetchOrder(orderId).then((orderDetail) => {
            setSelectedItemId(orderId);
            setOrders((prev) =>
                prev.map((item) => {
                    if (item.id !== orderId) return item;

                    const detail = orderDetail ?? [];
                    const totalQuantity =
                        item.totalQuantity ??
                        detail.reduce(
                            (sum: number, d: OrderDetailItem) => sum + (d.quantity ?? 0),
                            0
                        );
                    const totalPrice =
                        item.totalPrice ??
                        detail.reduce(
                            (sum: number, d: OrderDetailItem) => sum + (d.price ?? 0) * (d.quantity ?? 0),
                            0
                        );

                    return {
                        ...item,
                        detail,
                        totalQuantity,
                        totalPrice,
                        bookTitle: item.bookTitle || detail[0]?.title || "",
                    };
                })
            );
        });
    };

    return { orders, selectItemId, selectOrderItem };
};
