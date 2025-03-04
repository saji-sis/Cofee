import UserPanelLayout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/wishlist.module.css";
import Product from "@/components/templates/p-user/wishlist/Product";
import connectToDB from "@/configs/db";
import WishlistModel from "@/models/Wishlist";
import { authUser } from "@/utils/serverAuth";

const page = async () => {
  connectToDB();
  const user = await authUser();
  const wishlist = await WishlistModel.find({ user: user._id }).populate(
    "product"
  );
  console.log(wishlist);

  return (
    <UserPanelLayout>
      <main>
        <h1 className={styles.title}>
          <span>علاقه مندی ها</span>
        </h1>
        <div className={styles.container}>
          {wishlist.length &&
            wishlist.map((wish) => (
              <Product
                key={wish._id}
                productID={wish.product._id}
                name={wish.product.name}
                price={wish.product.price}
                score={wish.product.score}
              />
            ))}
        </div>

        {wishlist.length === 0 && (
          <p className={styles.empty}>محصولی وجود ندارد</p>
        )}
      </main>
    </UserPanelLayout>
  );
};

export default page;
