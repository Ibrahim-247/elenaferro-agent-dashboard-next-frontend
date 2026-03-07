import Container from "@/components/common/Container";
import logo from "../../assets/logo.png";
import Image from "next/image";

export default function layout({ children }) {
  return (
    <div>
      <Container>{children}</Container>
    </div>
  );
}
