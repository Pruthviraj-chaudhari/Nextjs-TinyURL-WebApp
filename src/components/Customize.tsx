import React, { useState, useCallback, useEffect } from 'react';
import { IoSparklesSharp } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';

interface CustomizeProps {
  alias: string;
  setAlias: (alias: string) => void;
}

const Customize: React.FC<CustomizeProps> = ({ alias, setAlias }) => {
  const [inputValue, setInputValue] = useState(alias || '');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('text-green-700');
  const [isAvailable, setIsAvailable] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const debounceCheckAvailability = useCallback(() => {
    const handler = setTimeout(() => {
      checkAliasAvailability(inputValue);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  useEffect(() => {
    if (inputValue.length > 0) {
      debounceCheckAvailability();
    } else {
      setMessage('');
    }
  }, [inputValue, debounceCheckAvailability]);

  const checkAliasAvailability = async (alias: string) => {
    const trimmedAlias = alias.trim();
    try {
      const response = await axios.post('/api/check-available', { alias: trimmedAlias });
      const data = response.data;
  
      setMessage(data.message);
      setMessageColor(data.success ? 'text-green-700' : 'text-red-700');
      setIsAvailable(data.success);
    } catch (error:any) {
      setMessage(error.response.data.message);
      setMessageColor('text-red-700');
      setIsAvailable(false);
    }
  };

  const handleCustomize = () => {
    if (isAvailable) {
      setAlias(inputValue);
      setIsDialogOpen(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant={'outline'} className="whitespace-nowrap">
          <IoSparklesSharp className="mr-1 h-4 w-4 text-amber-400" />
          Customize
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-md sm:max-w-[90vw]">
        <DialogHeader>
          <DialogTitle className="flex gap-2 justify-center md:justify-start">
            Customize link
            <IoSparklesSharp className="mr-1 h-4 w-4 text-amber-400" />
          </DialogTitle>
          <DialogDescription>
            Create a custom link with alias.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              type="text"
              name="alias"
              value={inputValue}
              placeholder="Enter alias"
              onChange={(e) => {
                // Remove spaces and update inputValue
                const filteredValue = e.target.value.replace(/\s+/g, '');
                setInputValue(filteredValue);
              }}
            />
          </div>
          <Button
            type="button"
            size="sm"
            className="px-3"
            onClick={handleCustomize}
            disabled={!isAvailable}
          >
            Customize
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <div className="flex justify-center md:justify-end items-center w-full">
            <p className={`flex my-2 ${messageColor}`}>{message}</p>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Customize;
