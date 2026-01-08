import Container from "@/components/common/Container";
import logo from "../../assets/logo.png";
import Image from "next/image";

export default function layout({ children }) {
  return (
    <div>
      <Container>
        <div className="py-6">
          <Image src={logo} alt="logo" className="w-64" />
        </div>
      </Container>
      <div className="max-w-177 mx-auto px-4 xl:px-0">{children}</div>
    </div>
  );
}
