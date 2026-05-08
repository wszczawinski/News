import { Sidebar } from './';

export const MainContent = ({ children }: { children: React.ReactElement }) => {
  return (
    <div className='py-3 px-3 sm:py-5 sm:px-4 md:px-6'>
      <main className='w-full min-h-screen mx-auto max-w-screen-lg flex flex-row gap-4 items-stretch'>
        <div className='flex-1 min-h-full w-max-full overflow-hidden'>{children}</div>
        <Sidebar />
      </main>
    </div>
  );
};
