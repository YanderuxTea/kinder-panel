import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";
import {
  Accounts,
  getKindergartens,
} from "@/components/shared/dashboard/blocksPanel/main/sadAdmin/action";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import {
  CloseEyeIcon,
  EyeIcon,
  LockIcon,
  MailIcon,
  PeopleIcon,
} from "@/components/icons";
import { createAccount } from "@/components/forms/panels/action";
import { toast } from "sonner";
import { Kindergartens } from "@/components/shared/dashboard/blocksPanel/main/sadAdmin/FirstBlockSA";
import { AnimatePresence, motion } from "framer-motion";

export default function CreateAccountForm({
  setOpenModal,
  setAccounts,
}: {
  setOpenModal: (value: boolean) => void;
  setAccounts: Dispatch<SetStateAction<Accounts[]>>;
}) {
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const [kindergartens, setKindergartens] = useState<Kindergartens[]>([]);
  const [loading, setLoading] = useTransition();
  const [selectKindergartenId, setSelectKindergartenId] = useState<string>("");
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  useEffect(() => {
    setLoading(async () => {
      const res = await getKindergartens();
      setKindergartens(res);
    });
  }, []);
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const login = data.login.toString();
    const password = data.password.toString();
    const fullname = data.fullname.toString();
    const email = data.email.toString();
    const role = data.role.toString();
    const res = await createAccount(
      login,
      fullname,
      email,
      password,
      role,
      selectKindergartenId,
    );
    if (res.ok) {
      setOpenModal(false);
      setAccounts((prevState) => [res.data, ...prevState]);
      toast.success("Успешно");
    } else {
      toast.error(res.message);
    }
  }
  return (
    <form onSubmit={handleSubmit} className={"flex flex-col gap-2"}>
      <label
        htmlFor="loginId"
        className={
          "flex flex-col gap-1 font-medium text-foreground-light" +
          " dark:text-foreground-dark text-sm"
        }
      >
        Логин
        <Input
          errorPack={{ isEnableError: false }}
          id={"loginId"}
          name={"login"}
          autoComplete={"off"}
          iconLeft={<PeopleIcon size={"sm"} />}
          placeholder={"Логин"}
          minLength={5}
          maxLength={12}
        />
      </label>
      <label
        htmlFor="fullnameId"
        className={
          "flex flex-col gap-1 font-medium text-foreground-light" +
          " dark:text-foreground-dark text-sm"
        }
      >
        Полное имя
        <Input
          errorPack={{ isEnableError: false }}
          id={"fullnameId"}
          name={"fullname"}
          autoComplete={"off"}
          iconLeft={<PeopleIcon size={"sm"} />}
          placeholder={"Иван Смирнов"}
        />
      </label>
      <label
        htmlFor="emailId"
        className={
          "flex flex-col gap-1 font-medium text-foreground-light" +
          " dark:text-foreground-dark text-sm"
        }
      >
        Почта
        <Input
          errorPack={{ isEnableError: false }}
          id={"emailId"}
          name={"email"}
          type={"email"}
          autoComplete={"off"}
          iconLeft={<MailIcon />}
          placeholder={"example@mail.com"}
        />
      </label>
      <label
        htmlFor="passwordId"
        className={
          "flex flex-col gap-1 font-medium text-foreground-light" +
          " dark:text-foreground-dark text-sm"
        }
      >
        Пароль
        <Input
          errorPack={{ isEnableError: false }}
          id={"passwordId"}
          name={"password"}
          type={visiblePassword ? "text" : "password"}
          autoComplete={"off"}
          iconLeft={<LockIcon />}
          minLength={8}
          iconRight={
            <button
              type={"button"}
              className={
                "text-muted-light-foreground dark:text-muted-dark-foreground" +
                " hover:text-foreground-light dark:hover:text-foreground-dark transition-colors duration-150 ease-in-out "
              }
              onClick={() => setVisiblePassword((prevState) => !prevState)}
            >
              {visiblePassword ? <CloseEyeIcon /> : <EyeIcon />}
            </button>
          }
          placeholder={"Пароль"}
        />
      </label>
      <span
        onClick={() => setOpenDropdown((prevState) => !prevState)}
        className={
          "flex flex-col gap-1 text-sm text-foreground-light" +
          " dark:text-foreground-dark font-medium select-none"
        }
      >
        Выберите садик
        <div
          className={
            "bg-input-light/30 dark:bg-input-dark/30 border border-border-light dark:border-border-dark" +
            " rounded-3xl h-12 text-foreground-light dark:text-foreground-dark text-sm font-medium p-3 relative"
          }
        >
          {kindergartens.find((kinder) => kinder.id === selectKindergartenId)
            ?.name || "Выберите садик"}
          <AnimatePresence>
            {openDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-2 absolute inset-x-0 bottom-0 bg-input-light dark:bg-input-dark rounded-2xl border border-border-light dark:border-border-dark p-2 overflow-hidden translate-y-full"
              >
                {kindergartens.map((kindergarten) => {
                  return (
                    <div
                      key={`ca-${kindergarten.id}`}
                      className={
                        "cursor-pointer border border-border-light dark:border-border-dark rounded-2xl p-3" +
                        " text-foreground-light dark:text-foreground-dark"
                      }
                      onClick={() => setSelectKindergartenId(kindergarten.id)}
                    >
                      {kindergarten.name}
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </span>
      <div className={"flex flex-col gap-1"}>
        <p
          className={
            "text-sm text-foreground-light dark:text-foreground-dark font-medium"
          }
        >
          Выберите роль
        </p>

        <div
          className={
            "flex flex-row justify-between max-w-2/3 mx-auto w-full gap-2"
          }
        >
          <label htmlFor="userRadio" className={"flex flex-col gap-1"}>
            <input
              type="radio"
              value={"user"}
              name={"role"}
              id={"userRadio"}
              defaultChecked={true}
              className={"hidden peer"}
            />
            <div
              className={
                "border border-border-light dark:border-border-dark select-none cursor-pointer" +
                " peer-checked:border-primary-light dark:peer-checked:border-primary-dark p-2" +
                " hover:bg-input-light/40 dark:hover:bg-input-dark/40 " +
                " rounded-2xl" +
                " bg-input-light/30 dark:bg-input-dark/30 peer-checked:bg-input-light/60" +
                " dark:peer-checked:bg-input-dark/60 transition-colors duration-150 ease-in-out" +
                " hover:peer-checked:bg-input-light/60 dark:hover:peer-checked:bg-input-dark/60" +
                " text-foreground-light dark:text-foreground-dark font-medium"
              }
            >
              Родитель
            </div>
          </label>
          <label htmlFor="staffRadio" className={"flex flex-col gap-1"}>
            <input
              type="radio"
              value={"staff"}
              name={"role"}
              id={"staffRadio"}
              className={"hidden peer"}
            />
            <div
              className={
                "border border-border-light dark:border-border-dark select-none cursor-pointer" +
                " peer-checked:border-primary-light dark:peer-checked:border-primary-dark p-2" +
                " hover:bg-input-light/40 dark:hover:bg-input-dark/40 " +
                " rounded-2xl" +
                " bg-input-light/30 dark:bg-input-dark/30 peer-checked:bg-input-light/60" +
                " dark:peer-checked:bg-input-dark/60 transition-colors duration-150 ease-in-out" +
                " hover:peer-checked:bg-input-light/60 dark:hover:peer-checked:bg-input-dark/60" +
                " text-foreground-light dark:text-foreground-dark font-medium"
              }
            >
              Воспитатель
            </div>
          </label>
        </div>
      </div>
      <Button
        type={"submit"}
        className={
          "font-medium text-primary-light-foreground" +
          " dark:text-primary-dark-foreground bg-primary-light dark:bg-primary-dark hover:bg-primary-light/90" +
          " dark:hover:bg-primary-dark/90 h-12"
        }
      >
        Создать
      </Button>
    </form>
  );
}
