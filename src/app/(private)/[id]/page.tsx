import { getUserGithub } from '../layout';

export interface PageProps {
  params: {
    id: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const user = await getUserGithub(params.id);

  return <div>{user!.username}</div>;
};

export default Page;
