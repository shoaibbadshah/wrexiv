import React, { useState } from 'react'
import { PencilIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

type EditableImageProps = {
    initialImage: string;
    onImageChange: () => void;
}

const EditableImage = ({ initialImage, onImageChange }: EditableImageProps) => {
    const [imagePreview, setImagePreview] = useState<string>(initialImage);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                setImagePreview(e.target?.result as string);
                onImageChange();
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Image
                src={imagePreview}
                alt="Preview"
                width={40}
                height={40}
                className="absolute h-full w-full object-cover rounded-full"
            />
            <label className="absolute top-0 left-0 h-full w-full flex items-center justify-center bg-gray-100 bg-opacity-10 rounded-full">
                <PencilIcon className="w-12 h-12 text-white text-md" />
                <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </label>
        </>
    );
};

export default EditableImage;
