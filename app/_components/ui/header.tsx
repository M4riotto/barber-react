import Image from "next/image";
import { Card, CardContent } from "./card"
import { Button } from "./button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetTrigger } from "./sheet";
import SidebarSheet from "../sidebar-sheet";
import Link from "next/link";
const Header = () => {
    return (
        <Card>
            <CardContent className="p-5 flex flex-row items-center justify-between">
                <Link href="/">
                    <Image alt="Barber" src="/logo.png" width={120} height={18} />
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button size="icon" variant="outline">
                            <MenuIcon />
                        </Button>
                    </SheetTrigger>
                    <SidebarSheet />
                </Sheet>
            </CardContent>
        </Card>
    );
}

export default Header;