import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { FilterX } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";

interface Condition {
    field: string;
    operator: string;
    value: string;
    logic:string;
}

export default function Filter({setFilterConditions}: any) {
    const [conditions, setConditions] = useState<Condition[]>([]);

    const handleAddFilter = () => {
        setConditions([...conditions, {
            field: "",
            operator: "",
            value: "",
            logic: ""
        }]);
    }

    const handleConditionChange = (index: any, key: any, value:any) => {
        const updatedConditions: any = [...conditions];
        updatedConditions[index][key] = value;
        setConditions(updatedConditions);
    };
    const handleSubmit = async () => {
        setFilterConditions(conditions);
        setConditions([]);
    };

    return (
        <Dialog>
            <DialogTrigger
                className="bg-gray-400 text-md py-5 px-2 font-bold rounded-[12px] h-9 inline-flex justify-center items-center gap-2 text-white text-md hover:bg-primary">
                <FilterX className="text-md" />
                Filter
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Filters</DialogTitle>
                    <DialogDescription>
                        {
                            conditions.map((condition, index) => (
                                <span key={index} className="flex gap-2 mb-3">
                                    <Select value={condition.field}
                                        onValueChange={(value) => handleConditionChange(index, "field", value)}
                                    >
                                        <SelectTrigger className="w-[140px]">
                                            <SelectValue placeholder="Field" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="total_spend">Total spending</SelectItem>
                                            <SelectItem value="visit_count">Visit count</SelectItem>
                                            <SelectItem value="last_visit">Last Visit</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select value={condition.operator}
            onValueChange={(value) => handleConditionChange(index, "operator", value)}
                                    >
                                        <SelectTrigger className="w-[100px]">
                                            <SelectValue placeholder="opeartor" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="gt">{'>'}</SelectItem>
                                            <SelectItem value="gte">{'>='}</SelectItem>
                                            <SelectItem value="lt">{'<'}</SelectItem>
                                            <SelectItem value="lte">{'<='}</SelectItem>
                                            <SelectItem value="eq">{'='}</SelectItem>
                                            <SelectItem value="ne">{'!='}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {
                                        condition.field === "last_visit" ? (
                                            <Input className="w-[140px]" type="date" value={condition.value}
            onChange={(e) => handleConditionChange(index, "value", e.target.value)}
            /> ) : (
                                                <Input className="w-[140px]" type="tel" value={condition.value}
            onChange={(e) => handleConditionChange(index, "value", e.target.value)}
            />
            )
                                    }
                                    {
                                        index !== conditions.length - 1 && (
                                            <Select value={condition.logic}
            onValueChange={(value) => handleConditionChange(index, "logic", value)}
                                            >
                                                <SelectTrigger className="w-[70px]">
                                                    <SelectValue placeholder="logic" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="and">AND</SelectItem>
                                                    <SelectItem value="or">OR</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        )
                                    }
                                </span>
                            ))

                        }
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button className="bg-gray-400 text-md py-5 font-bold px-4 rounded-[12px]" onClick={handleAddFilter}>
                        Add Filter
                    </Button>
                    <DialogClose asChild>
                    <Button className="bg-gray-400 text-md py-5 font-bold px-4 rounded-[12px]" onClick={handleSubmit}>
                        Filter
                    </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
