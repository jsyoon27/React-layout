import { Category } from "../models/category.model";
import { httpClient } from "./http";

type CategoryResponse = {
    category_id: number;
    category_name: string;
};

export const fetchCategory = async (): Promise<Category[]> => {
    const response = await httpClient.get<CategoryResponse[]>("/category");

    // Backend 컬럼명을 프런트 모델에 맞게 변환
    return response.data.map((item) => ({
        id: item.category_id,
        name: item.category_name,
    }));
};
