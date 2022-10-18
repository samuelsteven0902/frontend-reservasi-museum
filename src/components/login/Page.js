export default function Page({ children }) {
    return (
        <div className="bg-cover bg-center z-30  relative flex flex-col justify-between">
            {children}
        </div>
    );
}
