import { Barbershop } from "@prisma/client";
import { Card, CardContent } from "./card";
import Image from "next/image";
import { Button } from "./button";
import { Badge } from "./badge";
import { StarIcon } from "lucide-react";
import Link from "next/link";

interface BarbershopItemProps {
    barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
    return (
        <Card className="min-w-[167px] rounded-2xl">
            <CardContent className="p-0 px-1 pt-1">
                {/* imagem */}
                <div className="relative h-[159px] w-full">
                    <Image alt={barbershop.name} src={barbershop.imageUrl} fill className="object-cover rounded-2xl" />

                    <Badge className="absolute top-2 left-2 space-x-1" variant="secondary">
                        <StarIcon size={12} className="fill-primary text-primary" />
                        <p className="text-xs font-semibold">5,0</p>
                    </Badge>
                </div>

                {/* texto */}
                {/* overflow-hidden text-nowrap text-ellipsis = truncate */}
                <div className=" py-3 px-1">
                    <h3 className="font-semibold truncate">{barbershop.name}</h3>
                    <p className="text-sm text-gray-400 truncate">{barbershop.address}</p>
                    <Button variant="secondary" className="w-full mt-3" asChild>
                        <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default BarbershopItem;