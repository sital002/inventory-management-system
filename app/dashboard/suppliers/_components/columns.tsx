"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ISupplier } from "@/app/models/supplier";
import SupplierForm from "./supplier-form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteSupplier } from "@/actions/supplier";

export const supplierColumns: ColumnDef<ISupplier>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <span>{row.original.email}</span>,
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <span>{row.original.phone}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant={row.original.status === "Active" ? "default" : "secondary"}
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return <SupplierActions row={row} />;
    },
  },
];

interface SupplierActionsProps {
  row: {
    original: ISupplier;
  };
}

const SupplierActions: React.FC<SupplierActionsProps> = ({ row }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDelete = async () => {
    const result = await deleteSupplier(row.original._id.toString());
    if (result.success) {
      setDeleteOpen(false);
    }
  };
  return (
    <div className="flex gap-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Edit size={16} className="opacity-75 cursor-pointer" />
        </DialogTrigger>
        <DialogContent className="w-full sm:max-w-3xl">
          <DialogTitle></DialogTitle>
          <SupplierForm
            supplierId={row.original._id.toString()}
            data={row.original}
            update={true}
            hanldeClose={handleClose}
          />
        </DialogContent>
      </Dialog>
      <AlertDialog onOpenChange={setDeleteOpen} open={deleteOpen}>
        <AlertDialogTrigger asChild>
          <Trash2
            size={16}
            className="opacity-75 cursor-pointer text-red-600 hover:text-red-800"
            onClick={() => setDeleteOpen(true)}
          />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-red-800 text-white"
              onClick={handleDelete}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SupplierActions;
