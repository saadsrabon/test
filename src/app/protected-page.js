import useAuth from "@/components/hooks/useAuth";

const ProtectedPage = ({ children }) => {
    const isAuthenticated = useAuth();

    if (!isAuthenticated) {
        return <div>Loading...</div>;
    }

    return children;
};

export default ProtectedPage;
