import Image from "next/image";
import { Card, CardContent } from "./card"
import { Button } from "./button";
import { CalendarIcon, Ghost, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./sheet";
import { quickSearchOptions } from "@/app/_constants/search";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "./avatar";
import Link from "next/link";
const Header = () => {
    return (
        <Card>
            <CardContent className="p-5 flex flex-row items-center justify-between">
                <Image alt="" src="/logo.png" width={120} height={18} />
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline">
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="overflow-y-auto">
                        <SheetHeader>
                            <SheetTitle className="text-left">
                                Menu
                            </SheetTitle>
                        </SheetHeader>

                        <div className=" flex item-center py-5 border-b border-solid gap-3 ">
                            <Avatar>
                                <AvatarImage src="https://www.shutterstock.com/shutterstock/photos/2473353257/display_1500/stock-vector-monochromatic-avatar-of-a-man-with-a-beard-and-mustache-wearing-a-suit-and-tie-vector-portrait-2473353257.jpg" />
                            </Avatar>

                            <div>
                                <p className="font-bold">Vitor Moreira</p>
                                <p className="text-xs">vitortes@gmail.com</p>
                            </div>
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
                                <Button key={option.title} className="gap-2 justify-start" variant="ghost">
                                    <Image alt={option.title} src={option.imageUrl} height={18} width={18} />
                                    {option.title}
                                </Button>
                            ))}
                        </div>

                        <div className="py-5 flex flex-col gap-2">
                            <Button variant="ghost" className="justify-start gap-2">
                                <LogOutIcon size={18} />
                                Sair da conta
                            </Button>
                        </div>

                    </SheetContent>
                </Sheet>
            </CardContent>
        </Card>
    );
}

export default Header;