import { useUserStore } from "@/store/user";
import { useNavigate } from "react-router";
import { Pages } from "@/components/Router/constants.ts";
import type { ComponentType } from "react";

export const withAuth = (
  WrappedComponent: ComponentType,
) => {
  const { isAuth } = useUserStore();
  const navigate = useNavigate();

  return (props) => {
    if (!isAuth) {
      return navigate(Pages.Login);
    }

    return <WrappedComponent {...props} />
  };
};
