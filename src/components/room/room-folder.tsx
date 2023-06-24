import { RoomItemSkeleton } from './room-item-skeleton';
import { RoomList } from './room-list';
import { roomApi } from '@/services/room-servers';
import { useInfiniteQuery } from '@tanstack/react-query';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { useParams } from 'next/navigation';

export interface RoomFolderProps {}

export const RoomFolder = (props: RoomFolderProps) => {
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ['rooms'],
      queryFn: ({ pageParam }) => roomApi.getRooms({ cursor: pageParam, limit: 10 }),
      getNextPageParam: (lastPage) => lastPage.pageInfo.endCursor,
    });

  const rooms = data?.pages.map((page) => page.data).flat() || [];

  const [sentryRef, { rootRef }] = useInfiniteScroll({
    loading: isFetchingNextPage,
    hasNextPage: hasNextPage || false,
    onLoadMore: fetchNextPage,
  });

  const param = useParams();
  const activeId = param?.id as string | null;

  return (
    <div className="">
      <RoomList rooms={rooms} activeId={activeId} />
      {(isFetching || hasNextPage) && (
        <div ref={sentryRef} className="gap-2">
          <RoomItemSkeleton />
          <RoomItemSkeleton />
          <RoomItemSkeleton />
        </div>
      )}
    </div>
  );
};
