import { Button } from "@/components/ui/button";
import { UserInterfaceWithID } from "@/interfaces/interfaces";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface WhitelistTableProps {
    allowedPeople: UserInterfaceWithID[];
}

export const WhitelistPeopleTable = ({
    allowedPeople,
}: WhitelistTableProps) => {
    return (
        <div>
            <Table>
                <TableCaption>A list of whitelisted users.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px] text-white">
                            Username
                        </TableHead>
                        <TableHead className="text-right text-white">
                            Status
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allowedPeople.map((person) => (
                        <TableRow key={person.id} className="mx-2">
                            <TableCell className="font-medium">
                                {person.username}
                            </TableCell>
                            <TableCell className="text-right">
                                <Button className="bg-red-700 cursor-pointer">
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
