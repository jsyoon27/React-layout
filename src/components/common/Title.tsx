import {styled} from "styled-components";
import { HeadingSize,ColorKey } from "../../style/theme";

interface Props {
    children: React.ReactNode;
    size: HeadingSize;
    color?: ColorKey;
}

function Title({children,size,color}: Props) {
    return (<TitleStyle size={size} color={color}>{children}</TitleStyle>)
}

const TitleStyle = styled.h1<Omit<Props,"children">>`
    font-size: ${({theme, size})=> theme.heading[size].fontsize};
    color: ${({theme, color})=> color ? theme.color[color] : theme.color.primary};
`;

export default Title;