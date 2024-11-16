import { useState } from "react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Users } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export default function SegmentName({handleCreateSegment, segmentSize}: any) {
    const [segmentName, setSegmentName] = useState("");
    const handleSegmentCreation = () => {
        handleCreateSegment(segmentName);
        setSegmentName("");
    };
    return <Dialog>
        <DialogTrigger
            className="bg-gray-400 text-md py-5 px-2 font-bold rounded-[12px] h-9 inline-flex justify-center items-center gap-2 text-white text-md hover:bg-primary">
            <Users className="text-md" />
            Create Segment
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Enter segment name: ({segmentSize} Users)</DialogTitle>
                <DialogDescription>
                    <Input type="text" value={segmentName} onChange={(e) => setSegmentName(e.target.value)}/>
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <DialogClose asChild>
                    <Button onClick={handleSegmentCreation}>Create</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>
};
