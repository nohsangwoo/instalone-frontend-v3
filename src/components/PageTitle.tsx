import { Helmet } from 'react-helmet-async';

type Props = {
  title: string;
};

function PageTitle({ title }: Props): JSX.Element {
  return (
    <Helmet>
      <title>{title} | Instaclone</title>
    </Helmet>
  );
}

export default PageTitle;
