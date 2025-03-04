import UserPanelLayout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/index.module.css";
import Box from "@/components/templates/p-user/index/Box";
import Tickets from "@/components/templates/p-user/index/Tickets";
import Orders from "@/components/templates/p-user/index/Orders";
import { authUser } from "@/utils/serverAuth";
import TicketModel from "@/models/Ticket";
import CommentModel from "@/models/Comment";
import WishListModel from "@/models/Wishlist";
const page = async () => {
  const user = await authUser();
  const tickets = await TicketModel.find({ user: user._id })
    .limit(3)
    .populate("department", "title")
    .sort({ _id: -1 }) // برعکس نمایش میده
    .lean();

  const allTickets = await TicketModel.find({ user: user._id });
  const allComments = await CommentModel.find({ user: String(user._id) });
  const allWishLists = await WishListModel.find({ user: user._id });
  return (
    <UserPanelLayout>
      <main>
        <section className={styles.boxes}>
          <Box title="مجموع تیکت ها " value={allTickets.length} />
          <Box title="مجموع کامنت ها " value={allComments.length} />
          <Box title="مجموع سفارشات" value={allWishLists.length} />
          <Box title="مجموع علاقه مندی ها" value="10" />
        </section>
        <section className={styles.contents}>
          <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
          <Orders />
        </section>
      </main>
    </UserPanelLayout>
  );
};

export default page;
