const Layout = ({children}: {children: React.ReactNode}) => {
  return <div className='flex flex-col min-h-screen bg-gray-900 text-white justify-center items-center'>{children}</div>;
};

export default Layout;
