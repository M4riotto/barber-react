import Image from "next/image";
import {Card, CardContent} from "./card"
import { Button } from "./button";
import { MenuIcon } from "lucide-react";
const Header = () => {
    return ( 
        <Card>
            <CardContent className="p-5 flex flex-row items-center justify-between">
                <Image alt="" src="/logo.png" width={120} height={18} />
                <Button size="icon" variant="outline">
                    <MenuIcon />
                </Button>
            </CardContent>
        </Card>
     );
}
 
export default Header;