import { toast } from "sonner";
import { IoIosCheckmarkCircle } from "react-icons/io";
import Space from "~/components/space";

function success(message: string) {
  toast("", {
    description: (
      <Space className={"gap-1.5"}>
        <IoIosCheckmarkCircle size={18} />
        {message}
      </Space>
    ),
  });
}

export default {
  success,
};
