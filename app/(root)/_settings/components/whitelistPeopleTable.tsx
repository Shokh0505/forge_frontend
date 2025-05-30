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
import deleteWhitelistedPerson from "../_service/deleteWhitelistPerson";

interface WhitelistTableProps {
    allowedPeople: UserInterfaceWithID[];
    setAllowedPeople: (value: UserInterfaceWithID[]) => void;
}

export const WhitelistPeopleTable = ({
    allowedPeople,
    setAllowedPeople,
}: WhitelistTableProps) => {
    const handleDelete = async (id: string) => {
        const isSuccessfullyDeleted = await deleteWhitelistedPerson(id);

        if (isSuccessfullyDeleted) {
            setAllowedPeople(
                allowedPeople.filter((person) => person.id !== id)
            );
        }
    };

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
                    {allowedPeople.length === 0 && (
                        <TableRow>
                            <TableCell colSpan={2} className="text-center">
                                No whitelisted users
                            </TableCell>
                        </TableRow>
                    )}
                    {allowedPeople.map((person) => (
                        <TableRow key={person.id} className="mx-2">
                            <TableCell className="font-medium">
                                {person.username}
                            </TableCell>
                            <TableCell className="text-right">
                                <Button
                                    className="bg-red-700 cursor-pointer"
                                    onClick={() => handleDelete(person.id)}
                                >
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
