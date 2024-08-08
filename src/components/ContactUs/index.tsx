import { Typography } from "antd";

const { Link } = Typography;

const ContactUs = () => {
  return (
    <Link href={"mailto: contact@tastola.com"} target="_blank">
      Contact us
    </Link>
  );
};

export default ContactUs;
