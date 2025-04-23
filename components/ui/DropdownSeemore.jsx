import { useState } from "react";
import styled from "styled-components";
import SeeMoreIcon from "@/public/images/icons/ic_kebab.svg";

const SortButtonWrapper = styled.div`
  position: relative;
`;

const SeeMoreButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`;

const DropdownMenuContainer = styled.div`
  position: absolute;
  top: 110%;
  right: 0;
  background: #fff;
  border-radius: 8px;
  border: 1px solid var(--gray-200);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 99;
`;

const DropdownItem = styled.div`
  padding: 12px 44px;
  border-bottom: 1px solid var(--gray-200);
  font-size: 16px;
  color: var(--gray-800);
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
`;
const DropdownSeemore = ({ onSelection, options }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <>
      <SeeMoreButton onClick={toggleDropdown}>
        <SeeMoreIcon alt="kebab" />

        {isDropdownVisible && (
          <DropdownMenuContainer>
            {options.map((option) => (
              <DropdownItem
                key={option.key}
                onClick={() => {
                  onSelection(option.key);
                  setIsDropdownVisible(false);
                }}
              >
                {option.label}
              </DropdownItem>
            ))}
          </DropdownMenuContainer>
        )}
      </SeeMoreButton>
    </>
  );
};

export default DropdownSeemore;
