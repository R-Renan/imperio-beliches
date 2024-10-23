import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { Loader, UserRound } from "lucide-react";
import { RiWhatsappFill } from "react-icons/ri";
import { Avatar, AvatarImage } from "./ui/avatar";
import { FormField } from "./ui/form";
import { useForm } from "react-hook-form";
import { Send } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const WhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [hasError, setHasError] = useState(false);
  const form = useForm();

  const handleSendMessage = () => {
    if (message.trim() === "") {
      setHasError(true);
      setTimeout(() => setHasError(false), 2000);
      return;
    }

    setIsSending(true);

    setTimeout(() => {
      const url = `https://wa.me/5513996623318?text=${encodeURIComponent(
        message
      )}`;
      window.open(url, "_blank");
      setIsSending(false);
      setMessage("");
      setIsOpen(false);
    }, 2000);
  };

  return (
    <div className="fixed bottom-5 right-5">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant={"link"}
            className="p-3 bg-green-500 rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <RiWhatsappFill size={30} color="white" />
          </Button>
        </DialogTrigger>

        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <DialogContent className="bg-gray-100 max-w-[520px] rounded-lg p-10">
              <VisuallyHidden>
                <DialogTitle>Atendimento via WhatsApp</DialogTitle>
                <DialogDescription>
                  Digite sua mensagem para iniciar o atendimento.
                </DialogDescription>
              </VisuallyHidden>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-3 mb-4">
                  <UserRound className="w-10 h-10 rounded-full" />
                  <span className="font-semibold">
                    Atendimento via WhatsApp
                  </span>
                </div>

                <div className="bg-white p-3 w-full rounded-lg shadow-md">
                  <motion.div
                    className="flex gap-2 mb-3"
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Avatar>
                      <AvatarImage src="/icon.png" />
                    </Avatar>
                    <span className="text-green-500 font-medium text-nowrap mt-2">
                      Império Beliches:
                    </span>
                    <span className="mt-2 text-nowrap">
                      Olá, como podemos te ajudar?
                    </span>
                  </motion.div>

                  <input
                    type="text"
                    {...field}
                    placeholder="Digite sua mensagem..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`w-full p-2 bg-white border rounded-lg focus:outline-none focus:ring-2 ${
                      hasError
                        ? "ring-red-500 border-red-500"
                        : "border-gray-300 focus:ring-green-500"
                    }`}
                  />
                </div>

                {/* Animação no próprio botão de envio */}
                <motion.div
                  initial={false}
                  animate={isSending ? { scale: 1.1 } : { scale: 1 }} // Efeito de "pulse"
                  transition={{
                    duration: 0.5,
                    repeat: isSending ? Infinity : 0, // Repetir animação enquanto estiver enviando
                    repeatType: "reverse",
                  }}
                  className="w-full"
                >
                  <Button
                    variant={"secondary"}
                    onClick={handleSendMessage}
                    disabled={isSending} // Desabilita o botão enquanto envia
                    className={`mt-4 bg-green-500 text-white p-3 rounded-lg w-full flex items-center justify-center ${
                      isSending ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSending ? (
                      <motion.div
                        className="flex items-center"
                        // animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      >
                        <Loader className="mr-2" />
                      </motion.div>
                    ) : (
                      <>
                        <Send className="mr-2" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>
            </DialogContent>
          )}
        />
      </Dialog>
    </div>
  );
};

export default WhatsApp;
