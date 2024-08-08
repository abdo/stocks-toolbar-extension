import { ReactNode } from "react";
import Box from "../Box";

type Props = {
  k: string;
  v: string | ReactNode;
};

const KeyValue = ({ k, v }: Props) => {
  return (
    <Box display="flex" gap="3px" fz="14px" fw="500">
      <Box color="#0c0c0c">{k}:</Box>
      <Box color="#737373">{v}</Box>
    </Box>
  );
};

export default KeyValue;
