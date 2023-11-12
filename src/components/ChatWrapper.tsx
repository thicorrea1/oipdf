"use client"
import { trpc } from "@/app/_trpc/client"
import ChatInput from "./ChatInput"
import Messages from "./Messages"
import { Loader2 } from "lucide-react"

interface ChatWrapperProps {
    fileId: string
}

export const ChatWrapper = ({fileId} : ChatWrapperProps) => {

    const {data, isLoading} = trpc.getFileUploadStatus.useQuery({
        fileId: fileId
    }, {
        refetchInterval: (data) => 
            data?.status === "SUCCESS" || data?.status === "FAILED" ? false : 500
        
    })

    if(isLoading) return (
        <div className="relative min-h-full bg-zinc-50 flex divide-y divide-zinc-2oo flex-col justify-between gap-2">
            <div className="flex-1 flex justify-center items-center flex-col mb-28">
                <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 text-purple-500 animate-spin" />
                    <h3 className="font-semibold text-xl">Carregando...</h3>
                    <p className="text-zinc-500 text-sm">Estamos preparando seu PDF.</p>
                </div>
            </div>
        </div>
    )

    return <div className="relative min-h-4 bg-zinc-50 flex divide-y divide-zinc-200 flex-col justify-between gap-2">
        <div className="flex-1 justify-between flex flex-col mb-28">
            <Messages />
        </div>
        <ChatInput />
    </div>
}
export default ChatWrapper