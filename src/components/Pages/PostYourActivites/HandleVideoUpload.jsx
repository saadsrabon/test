import React, { useState } from 'react';
import { ImFileVideo } from 'react-icons/im';
import { IoCloseSharp } from 'react-icons/io5';
import { Bounce, toast } from 'react-toastify';
import { useUploadFileMutation } from '@/store/services/fileUploadApi';
import { LoaderCircle, LoaderIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const HandleVideoUpload = ({ images, videos, setVideos }) => {
    // const [] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    console.log('videos images', images, videos);



    const [uploadFile, { isLoading }] = useUploadFileMutation();

    const handleVideoUpload = (event) => {
        const files = Array.from(event.target.files);
        processFiles(files);
    };

    const processFiles = async (files) => {
        if (videos?.length + files?.length <= (5 - images.length)) {
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
                const updatedVideos = [...videos, ...uploadedVideoLinks];

                setVideos(updatedVideos);
                console.log('Updated videos:', updatedVideos);
            } catch (error) {
                console.error('Video upload failed:');
                toast.error('Video upload failed', {
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

    const handleVideosDelete = (index) => {
        const updatedVideos = videos.filter((_, i) => i !== index);
        setVideos(updatedVideos);
        console.log('Videos after deletion:', updatedVideos);
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
        const videoFiles = files.filter(file => file.type.startsWith('video/'));

        if (videoFiles.length !== files.length) {
            toast.error('Only video files are allowed', {
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

        processFiles(videoFiles);
    };

    return (
        <div className={cn("relative w-full mb-4", { 'opacity-45': isLoading })}>
            {isLoading && (
                <div className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" >
                    <LoaderCircle className="duration-1000 opacity-100 sm:size-14 animate-spin text-slate-200" />
                </div>
            )}
            <label className="block mb-3">Product Videos</label>
            <div
                className={`relative flex flex-col px-3 py-5 h-[140px] border border-dashed rounded-md ${isDragging ? 'border-blue-500 bg-blue-50' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <label htmlFor="videoUpload" className="flex items-center justify-center h-full gap-3 cursor-pointer">
                    <ImFileVideo className="text-3xl text-muted-foreground" />
                    <div className="text-gray-400">
                        <p className="mb-3">Drop videos or</p>
                        <p className="text-blue-500 underline">click to browse</p>
                    </div>
                </label>
                <input
                    id="videoUpload"
                    name="video"
                    type="file"
                    accept="video/*"
                    multiple
                    className="hidden"
                    onChange={handleVideoUpload}
                />
            </div>

            {/* Render selected videos below the input */}
            <div className="flex gap-4 p-1 mt-4 rounded-md bg-slate-50">
                {videos?.length > 0 ? (
                    videos?.map((video, index) => (
                        <div key={index} className="relative group">
                            <video
                                width={128}
                                height={128}
                                controls
                                src={video}
                                className="object-cover border rounded-md aspect-square"
                            >
                                Your browser does not support the video tag.
                            </video>
                            <button
                                type="button"
                                onClick={() => handleVideosDelete(index)}
                                className="absolute top-0 right-0 text-xs text-white transition-opacity duration-300 bg-red-500 rounded-full opacity-0 md:p-1 md:top-1 md:right-1 size-4 sm:size-auto group-hover:opacity-100"
                            >
                                <IoCloseSharp className="size-4" />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No videos selected yet.</p>
                )}
            </div>

        </div>
    );
};

export default HandleVideoUpload;
