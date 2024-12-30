type ScrollAreaProps = {
  children: React.ReactNode;
};
const ScrollArea = ({ children }: ScrollAreaProps) => {
  return (
    <div className="overflow-y-auto scrollbar w-full h-[calc(100vh-5rem)] max-h-screen">
      {children}
    </div>
  );
};
export default ScrollArea;
