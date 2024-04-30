import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { Button } from "../ui/button"
import parse from "html-react-parser";
import { AppContext } from '@edx/frontend-platform/react';

// Interface untuk props laporan
interface ReportProps {
  id: number;
  threadId : number;
  commentId: number;
  commentReplyId: number;
  author: string;
  content: string;
  reportType: string;
}

function ReportList() {
  // State untuk menyimpan daftar laporan
  const [reports, setReports] = useState<ReportProps[]>([]);
  const { authenticatedUser } = React.useContext(AppContext);

  // Fungsi untuk mengambil data laporan dari server
  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://194.233.93.124:3030/discussion/report/list`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch report data');
      }
      const data = await response.json();

      setReports(data);
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  const handleDelete = async (threadId: number, commentId: number, commentReplyId: number) => {
    try {
      let path = "";
      let id = null;

    if (commentReplyId !== null) {
      path = "/comment-reply";
      id = commentReplyId;
    } else if (commentId !== null) {
      path = "/comment";
      id = commentId;
    } else if (threadId !== null) {
     path="";
     id = threadId 
    }
  
      const response = await fetch(
        `http://194.233.93.124:3030/discussion${path}/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: authenticatedUser.username,
            isAdmin: authenticatedUser.administrator,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setReports((prevData) =>
        prevData.filter((report) => (report.thread_id !== id && report.comment_id !== id && report.comment_reply_id !== id)
      ));
      const data = await response.json();
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  // Mengambil data laporan saat komponen pertama kali dimuat
  useEffect(() => {
    fetchData();
  }, []); // Efek samping hanya dijalankan sekali saat komponen dimuat

  return (
    <>
    <Table>
      <TableCaption>List Report</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Author</TableHead>
          <TableHead>Content</TableHead>
          <TableHead>Report Type</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      {reports.map((report) => (
            <TableRow key={report.id}>
              <TableCell>{report.author}</TableCell>
              <TableCell>{report.content ? parse(report.content) : report.content}</TableCell>
              <TableCell>{report.report_type}</TableCell>
              <TableCell>
              <Button className="bg-red-500 hover:bg-red-700" onClick={() => handleDelete(report.thread_id, report.comment_id, report.comment_reply_id)}>Delete</Button>
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </>
  );
}

export default ReportList;
