import { productRegisterValidation } from "../components/util/productValidation";

const useValidation = (type, data) => {
  if (type === "product") {
    return productRegisterValidation(data);
  }
};

export default useValidation;
