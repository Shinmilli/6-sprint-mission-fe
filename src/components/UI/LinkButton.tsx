import { Link } from "react-router-dom";
import type { LinkProps } from "react-router-dom";
import styled from "styled-components";
import { buttonStyle } from "./Button"; // Button.tsx에서 export한 buttonStyle import

interface LinkButtonProps extends LinkProps {
  $pill?: boolean;
  $appearance?: "primary" | "secondary";
}

const LinkButton = styled(Link)<LinkButtonProps>`
  ${buttonStyle}
`;

export default LinkButton;
