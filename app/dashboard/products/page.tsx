import ServiceItem from "@/app/_components/service-item";
import SideBar from "@/app/_components/SideBar";
import { Button } from "@/app/_components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";
import { Input } from "@/app/_components/ui/input";
import { db } from "@/app/_lib/prisma";
import Image from "next/image";

const products = async () => {

    //chamer banco de dados
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: "3cfcc585-2e3c-43c6-9202-ee431ed344b9"
        },
        include: {
            services: true
        }
    })

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <SideBar />
                    <div className="relative ml-auto flex-1 md:grow-0">
                        {/* <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /> */}
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full relative rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                                <Image
                                    src="/placeholder-user.jpg"
                                    width={36}
                                    height={36}
                                    alt="Avatar"
                                    className="overflow-hidden rounded-full"
                                    style={{ aspectRatio: "36/36", objectFit: "cover" }}
                                />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
                        <h2 className="font-bold uppercase text-gray-400 text-xs ">Serviços</h2>
                        <div className="md:grid-cols-2 grid grid-cols-1 gap-2">
                            {barbershop?.services.map(service => <ServiceItem key={service.id} barbershop={JSON.parse(JSON.stringify(barbershop))} service={JSON.parse(JSON.stringify(service))} />)}
                        </div>
                    </div>
                </main>
            </div>
        </div >
    );
}

export default products;