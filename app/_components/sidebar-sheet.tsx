"use client"

import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { quickSearchOptions } from "@/app/_constants/search";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { signIn, signOut, useSession } from "next-auth/react";
import SignInDialog from "./sign-in-dialog";

const SidebarSheet = () => {

    const { data } = useSession()

    const handleLoginWithGoogleClic = () => signIn("google")
    const handleLogoutClick = () => signOut()


    return (
        <SheetContent className="overflow-y-auto">
            <SheetHeader>
                <SheetTitle className="text-left">
                    Menu
                </SheetTitle>
            </SheetHeader>

            <div className=" flex items-center justify-between py-5 border-b border-solid gap-3 ">

                {data?.user ? (
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage alt={data.user.name ?? ''} src={data?.user?.image ?? ''} />
                        </Avatar>
                        <div>
                            <p className="font-bold">{data.user.name}</p>
                            <p className="text-xs">{data.user.email}</p>
                        </div>
                    </div>
                ) :
                    <>
                        <h2 className="font-bold">Olá faça seu login</h2>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button size="icon">
                                    <LogInIcon />
                                </Button>
                            </DialogTrigger>

                            <DialogContent className="w-[90%]">
                                <SignInDialog />
                            </DialogContent>
                        </Dialog>
                    </>
                }
            </div>

            <div className="py-5 flex flex-col gap-2 border-b border-solid">
                <SheetClose asChild>
                    <Button className="justify-start gap-2" variant="ghost" asChild>
                        <Link href="/" >
                            <HomeIcon />
                            Inicio
                        </Link>
                    </Button>
                </SheetClose>
                <Button className="gap-2 justify-start" variant="ghost">
                    <CalendarIcon size={18} />
                    Agendamentos</Button>
            </div>


            <div className="py-5 flex flex-col gap-2 border-b border-solid">
                {quickSearchOptions.map((option) => (
                    <SheetClose asChild key={option.title}>
                        <Button className="gap-2 justify-start" variant="ghost" asChild>
                            <Link href={`/barbershops?service=${option.title}`}>
                                <Image alt={option.title} src={option.imageUrl} height={18} width={18} />
                                {option.title}
                            </Link>
                        </Button>
                    </SheetClose>
                ))}
            </div>


          {data?.user && (
              <div className="py-5 flex flex-col gap-2">
              <Button variant="ghost" className="justify-start gap-2" onClick={handleLogoutClick}>
                  <LogOutIcon size={18} />
                  Sair da conta
              </Button>
          </div>
          )}

        </SheetContent>
    );
}

export default SidebarSheet;