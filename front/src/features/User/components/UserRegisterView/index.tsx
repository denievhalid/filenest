import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router";
import { Pages } from "@/components/Router/constants.ts";
import { useState } from "react";

export const UserRegisterView = () => {
  const [firstName, setFirstName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <h1 className="text-3xl font-bold flex gap-2 items-center">
        <svg
          fill="#FD337E"
          width="42px"
          height="42px"
          viewBox="0 -8 72 72"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M43,14.06A10.47,10.47,0,0,1,53.42,24.39a4.48,4.48,0,0,0-.05.64l-.09,2.56,2.42.84a6.94,6.94,0,0,1-2.28,13.51H18.58A7,7,0,0,1,18.47,28l.5.05,2.65.18.87-2.5A7,7,0,0,1,29,21a6.86,6.86,0,0,1,1.22.13l2.44.44,1.21-2.16A10.46,10.46,0,0,1,43,14.06m0-3.48a13.86,13.86,0,0,0-12.1,7.15A11.14,11.14,0,0,0,29,17.55a10.4,10.4,0,0,0-9.83,7c-.21,0-.41-.06-.62-.06a10.45,10.45,0,0,0,0,20.9H53.42a10.43,10.43,0,0,0,3.42-20.29c0-.21.07-.4.07-.61A13.94,13.94,0,0,0,43,10.58Z" />
        </svg>
        FileNest
      </h1>
      <form className="max-w-72 w-full flex flex-col gap-4" onSubmit={onSubmit}>
        <Input
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Логин"
          value={login}
        />
        <Input
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Имя"
          value={firstName}
        />
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Пароль"
          value={password}
        />
        <Button type="submit">Зарегистрироваться</Button>
      </form>
      <div className="flex gap-2 text-xs">
        <span className="text-[#959595]">У вас есть аккаунт?</span>
        <Link className="text-primary" to={Pages.Login}>
          Войти
        </Link>
      </div>
    </div>
  );
};
