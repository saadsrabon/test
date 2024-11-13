import { cn } from '@/lib/utils'
import { useUploadFileMutation } from '@/store/services/fileUploadApi'
import { LoaderCircle } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { ImFilePicture } from 'react-icons/im'
import { IoCloseSharp } from 'react-icons/io5'
import { Bounce, toast } from 'react-toastify'

const HandleImageUpload = ({ videos, images, setImages }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadFile, { isLoading }] = useUploadFileMutation();

    const handleImageUpload = async (event) => {
        const files = Array.from(event.target.files);
        processFiles(files);
    };

    const processFiles = async (files) => {
        if (images?.length + files?.length <= (5 - videos.length)) {
            try {
                const uploadPromises = files.map(async (file) => {
                    const formData = new FormData();
                    formData.append('file', file);

                    // Assuming the API returns the hosted link in the `url` field
                    const response = await uploadFile(formData).unwrap();
                    console.log(response.data.file_url);
                    return response.data.file_url;
                });

                const uploadedVideoLinks = await Promise.all(uploadPromises);
                const updatedImages = [...images, ...uploadedVideoLinks];

                setImages(updatedImages);
                console.log('Updated images:', updatedImages);
            } catch (error) {
                console.error('Image upload failed:');
                toast.error('Image upload failed', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                    transition: Bounce,
                });
            }
        } else {
            toast.error('You can upload total 5 media files', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
                transition: Bounce,
            });
        }
    };

    const handleImageDelete = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const files = Array.from(event.dataTransfer.files);

        // Filter out non-image files
        const imageFiles = files.filter(file => file.type.startsWith('image/'));

        if (imageFiles.length !== files.length) {
            toast.error('Only image files are allowed', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
                transition: Bounce,
            });
        }

        processFiles(imageFiles);
    };

    return (
        <div className={cn("relative w-full mb-4", { 'opacity-45': isLoading })}>
            {isLoading && (
                <div className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" >
                    <LoaderCircle className="duration-1000 opacity-100 sm:size-14 animate-spin text-slate-200" />
                </div>
            )}
            <label className="block mb-3">Product Images</label>
            <label
                className={`relative flex flex-col h-[140px] px-3 py-5 border cursor-pointer border-dashed rounded-md ${isDragging ? 'border-blue-500 bg-blue-50' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <label htmlFor="imageUpload" className="flex items-center justify-center h-full gap-3 cursor-pointer">
                    <ImFilePicture className="text-3xl text-muted-foreground" />
                    <div className="text-gray-400">
                        <p className="mb-3">Drop images or</p>
                        <p className="text-blue-500 underline">click to browse</p>
                    </div>
                </label>
                <input
                    id="imageUpload"
                    name="image"
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                />
            </label>

            {/* Render selected images below the input */}
            <div className="flex gap-4 p-1 mt-4 rounded-md bg-slate-50">
                {images?.length > 0 ? (
                    images?.map((image, index) => (
                        <div key={index} className="relative group">
                            <Image
                                width={150}
                                height={150}
                                src={image}
                                alt={`Product ${index + 1}`}
                                className="object-cover border rounded-md size-16 md:size-32"
                            />
                            <button
                                type="button"
                                onClick={() => handleImageDelete(index)}
                                className="absolute top-0 right-0 text-xs text-white transition-opacity duration-300 bg-red-500 rounded-full opacity-0 md:p-1 md:top-1 md:right-1 size-4 sm:size-auto group-hover:opacity-100"
                            >
                                <IoCloseSharp className="size-4" />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No images selected yet.</p>
                )}
            </div>

            <p className="mt-3 text-xs text-gray-500">
                You need total 5 media files.
            </p>
        </div>
    )
}

export default HandleImageUpload;
