import React from "react";
import connectToDB from "@/configs/db";
import Commentmodel from "@/models/Comment";
import { authUser } from "@/utils/serverAuth";
import Layout from "@/components/layouts/UserPanelLayout";
import DataTable from "@/components/templates/p-user/comments/DataTable";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await authUser();
  if (!user) {
    redirect("/login-register");
  }

  connectToDB();
  const comments = await Commentmodel.find(
    { user: String(user._id) },
    "-__v"
  ).populate("productID", "name");

  console.log(comments);

  return (
    <Layout>
      <main>
        <DataTable
          comments={JSON.parse(JSON.stringify(comments))}
          title="لیست کامنت‌ها"
        />
        {/* <p className={styles.empty}>
          کامنتی وجود ندارد
        </p>  */}
      </main>
    </Layout>
  );
};

export default page;
