import { Avatar, AvatarImage } from "./avatar";
import { Badge } from "./badge";
import { Card, CardContent } from "./card";

// TODO: RECEBER AGENDA,ENTO COMO PROP

const BookingItem = () => {
    return (
        <>
            {/* AGENDAMENTo  */}

            <h2 className="uppercase text-gray-400 font-bold text-xs mt-6 mb-6">Agendamentos</h2>

            <Card >
                <CardContent className="flex justify-between p-0">

                    {/* esquerda  */}
                    <div className="flex flex-col gap-2 py-5 pl-5 ">
                        <Badge className="w-fit">Confirmado</Badge>
                        <h3 className="font-semibold">Corte de cabelo</h3>
                        <div className="flex gap-2 item-center">
                            <Avatar className="h-6 w-6">
                                <AvatarImage alt="" src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                            </Avatar>

                            <p className="text-sm">Barbearia FSW</p>

                        </div>
                    </div>

                    {/* DIREITA  */}

                    <div className="flex flex-col flex-center items-center justify-center px-5 border-l-2 border-solid">
                        <p className="text-sm">Fevereiro</p>
                        <p className="text-2xl">06</p>
                        <p className="text-sm">09:45</p>
                    </div>

                </CardContent>
            </Card>
        </>
    );
}

export default BookingItem;