import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import React, { Dispatch, SetStateAction } from "react";
import { MailIcon, MapMarkIcon, TelephoneIcon } from "@/components/icons";
import { toast } from "sonner";
import { changeDataForSettings } from "@/components/shared/dashboard/panels/action";
import { DataSettings } from "@/components/shared/dashboard/panels/SettingsPanel";

export default function SettingsForm({
  fullname,
  email,
  tel,
  address,
  setDataSettings,
}: {
  fullname: string;
  email: string;
  tel: string;
  address: string;
  setDataSettings: Dispatch<SetStateAction<DataSettings>>;
}) {
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const fullnameNew =
      data.name.toString().trim() + " " + data.surname.toString().trim();
    const emailNew = data.email;
    const telephoneNew = data.tel;
    const addressNew = data.address;
    const newData = {
      fullname: fullnameNew.trim(),
      email: String(emailNew).trim(),
      tel: String(telephoneNew).trim(),
      address: String(addressNew).trim(),
    };
    const res: { ok: boolean } = await changeDataForSettings({ data: newData });
    if (res.ok) {
      toast.success("Успешно");
    } else {
      toast.error("Произошла ошибка");
    }
  }
  const splitFullName = fullname.split(" ");
  const name = splitFullName[0];
  const surname = splitFullName[1];
  return (
    <form onSubmit={handleSubmit} className={"flex flex-col gap-3"}>
      <div className="flex flex-col gap-3 lg:flex-row text-sm font-medium text-foreground-light dark:text-foreground-dark">
        <div className="flex flex-col gap-3 w-full">
          <label htmlFor="nameIdSettings" className={"flex flex-col gap-1"}>
            Имя
            <Input
              autoComplete={"off"}
              errorPack={{ isEnableError: false }}
              id={"nameIdSettings"}
              name={"name"}
              defaultValue={name}
            />
          </label>
          <label
            htmlFor="surnameIdSettingsMob"
            className={"flex-col gap-1 flex lg:hidden"}
          >
            Фамилия
            <Input
              autoComplete={"off"}
              errorPack={{ isEnableError: false }}
              id={"surnameIdSettingsMob"}
              name={"surname"}
              defaultValue={surname}
            />
          </label>
          <label
            htmlFor="emailIdSettingsDesk"
            className={"hidden flex-col gap-1 lg:flex"}
          >
            <span className={"flex flex-row items-center gap-2"}>
              <span
                className={
                  "text-muted-light-foreground dark:text-muted-dark-foreground"
                }
              >
                <MailIcon />
              </span>
              Адрес электронной почты
            </span>

            <Input
              value={email}
              autoComplete={"email"}
              errorPack={{ isEnableError: false }}
              id={"emailIdSettingsDesk"}
              name={"email"}
              onChange={(e) =>
                setDataSettings((prevState) => {
                  return { ...prevState, email: e.target.value.trim() };
                })
              }
            />
          </label>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <label
            htmlFor="surnameIdSettingsDesc"
            className={"flex-col gap-1 hidden lg:flex"}
          >
            Фамилия
            <Input
              autoComplete={"off"}
              errorPack={{ isEnableError: false }}
              id={"surnameIdSettingsDesc"}
              name={"surname"}
              defaultValue={surname}
            />
          </label>
          <label
            htmlFor="emailIdSettingsMob"
            className={"flex flex-col gap-1 lg:hidden"}
          >
            <span className={"flex flex-row items-center gap-2"}>
              <span
                className={
                  "text-muted-light-foreground dark:text-muted-dark-foreground"
                }
              >
                <MailIcon />
              </span>
              Адрес электронной почты
            </span>

            <Input
              value={email}
              autoComplete={"email"}
              errorPack={{ isEnableError: false }}
              id={"emailIdSettingsMob"}
              name={"email"}
              onChange={(e) =>
                setDataSettings((prevState) => {
                  return { ...prevState, email: e.target.value.trim() };
                })
              }
            />
          </label>
          <label
            htmlFor="telephoneIdSettings"
            className={"flex flex-col gap-1"}
          >
            <span className={"flex flex-row items-center gap-2"}>
              <span
                className={
                  "text-muted-light-foreground dark:text-muted-dark-foreground"
                }
              >
                <TelephoneIcon />
              </span>
              Номер телефона
            </span>

            <Input
              value={tel || ""}
              autoComplete={"tel"}
              errorPack={{ isEnableError: false }}
              id={"telephoneIdSettings"}
              name={"tel"}
              onChange={(e) =>
                setDataSettings((prevState) => {
                  return { ...prevState, tel: e.target.value.trim() };
                })
              }
            />
          </label>
        </div>
      </div>

      <label
        htmlFor="addressIdSettings"
        className={
          "flex flex-col gap-1 text-sm font-medium text-foreground-light dark:text-foreground-dark"
        }
      >
        <span className={"flex flex-row items-center gap-2"}>
          <span
            className={
              "text-muted-light-foreground dark:text-muted-dark-foreground"
            }
          >
            <MapMarkIcon />
          </span>
          Домашний адрес
        </span>

        <Input
          value={address || ""}
          autoComplete={"off"}
          errorPack={{ isEnableError: false }}
          id={"addressIdSettings"}
          name={"address"}
          onChange={(e) =>
            setDataSettings((prevState) => {
              return { ...prevState, address: e.target.value };
            })
          }
        />
      </label>

      <Button
        type="submit"
        className={
          "h-12 bg-primary-light dark:bg-primary-dark w-full hover:bg-primary-light/90" +
          " dark:hover:bg-primary-dark/90"
        }
      >
        Сохранить
      </Button>
    </form>
  );
}
