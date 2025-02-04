
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";

import Image from "next/image";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";

const SignInDialog = () => {


    const handleLoginWithGoogleClic = () => signIn("google")


    return (
        <>
            <DialogHeader>
                <DialogTitle>Faça login na plataforma</DialogTitle>
                <DialogDescription>
                    Conecte-se usando a conta google
                </DialogDescription>
            </DialogHeader>
            <Button variant="outline" className="gap-1 font-bold" onClick={handleLoginWithGoogleClic}>
                <Image alt="login com o google" src="/google.svg" width={18}
                    height={18} />
                Google
            </Button>
        </>
    );
}

export default SignInDialog;