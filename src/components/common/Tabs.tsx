import React, { useState } from "react";
import styled from "styled-components";

interface TabProps {
    title: string;
    children: React.ReactNode;
}


function Tab({ children }: TabProps) {
    return <>{children}</>
}

interface TabsProps {
    children: React.ReactNode;
}


function Tabs({ children }: TabsProps) {
    const [activeindex, setActiveIndex] = useState(0);
    const tabs = React.Children.toArray(children) as React.ReactElement<TabProps>[];

    return (
        <TabsStyle>
            <div className="tab-header">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={activeindex === index ? "active" : ""}
                    >
                        {tab.props.title}
                    </button>
                ))}
            </div>
            <div className="tab-content">
                {tabs[activeindex]}
            </div>
        </TabsStyle>
    );
}

const TabsStyle = styled.div`
    .tab-header {
        display: flex;
        gap: 2px;
        border-bottom: 1px solid #ddd;
        
        button {
            border: none;
            backgroung: #ddd;
            cursor: pointer;
            font-size: 1.25;
            font-weight: bold;
            color: ${({theme}) => theme.color.text};
            border-radius: ${({theme}) => theme.borderRadius.default}
            ${({theme}) => theme.borderRadius.default}
            0 0;
            padding: 12px 24px;
            


            &.active {
                color: #fff;
                background: ${({theme}) => theme.color.primary};
            }
        }
    }
        .tab-content {
        padding: 24px 0;
    }
`;

export { Tabs, Tab };
export default Tabs;
