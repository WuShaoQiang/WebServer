package ex9;

import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.net.Socket;
import java.net.URLConnection;
import java.nio.file.Files;
import java.util.Date;

public class RequestProcessor implements Runnable{
	
	private File rootDirectory;
	private Socket connection;
	
	public RequestProcessor(File rootDirectory,Socket connection) {		  //构造函数
		if(rootDirectory.isFile())
		{
			throw new IllegalArgumentException("root Directory must be a directory, not a file");
		}
		try	
		{
			rootDirectory = rootDirectory.getCanonicalFile();   
		}catch (IOException ex) {
			// TODO: handle exception
		}
		this.rootDirectory = rootDirectory;
		this.connection = connection;
	}
	
	@Override
	public void run() {
	String root = rootDirectory.getPath(); 	 //得到路径
	try
	{
		OutputStream raw = new BufferedOutputStream(connection.getOutputStream());
		Writer writer = new OutputStreamWriter(raw,"utf-8");
		BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream(), "utf-8")) ;
		StringBuilder requestLine = new StringBuilder();
		
		while(true)
		{

			String line = reader.readLine();
			if(line.equals(""))      //报文头的“\r\n”
			{
				break;				//检测到后证明报文头已经接收完毕
			}
			requestLine.append(line+'\n');
		}
		
		String header = requestLine.toString(); 			//报文头部
		String[] line = header.split("\n");
		String get = line[0];
//		LogInfo.appendLog(connection.getRemoteSocketAddress() + " " + get);		
		String[] tokens = get.split("\\s+");  				// /s表示匹配任何空白字符
		String method = tokens[0];							//得到方法
		String version = "";
		
		if(method.equals("GET"))							//GET
		{
			String fileName = tokens[1];
			System.out.println(fileName);
			String contentType = URLConnection.getFileNameMap().getContentTypeFor(fileName);  	//猜测文件类型
			System.out.println(contentType);
			if(tokens.length>2)
			{
				version = tokens[2];
			}
			
			File theFile = new File(rootDirectory,fileName.substring(1, fileName.length()));	//filename一开始前面有/ 需要去掉   找到文件
			if(theFile.canRead() && theFile.getCanonicalPath().startsWith(root))
			{
				byte[] theData = Files.readAllBytes(theFile.toPath());							//二进制读取文件
				if(version.startsWith("HTTP/"))
				{
					sendHeader(writer, "HTTP/1.0 200 OK",contentType , theData.length);
				}
				raw.write(theData);
				raw.flush();
			}
			else     										 									//文件不能读取就显示404 NOT FOUNT
			{
				String body = new StringBuilder("<HTML>\r\n")
						.append("<HEAD><TITLE>File Not Found</TITLE>\r\n")
						.append("<HEAD>\r\n")
						.append("<BODY>")
						.append("<H1>HTTP Error 404: File Not Found</H1>\r\n")
						.append("</BODY></HTML>\r\n").toString();
				if(version.startsWith("HTTP/"))
				{
					sendHeader(writer, "HTTP/1.0 404 File Not Found", "text/html; charset=utf-8", body.length());
				}
				writer.write(body);
				writer.flush();
			}
			
		}
//		else if (method.equals("HEAD")) 						//HEAD
//		{
//			String fileName = tokens[1];
//			if(fileName.endsWith("/"))
//			{
//				fileName+=indexFileName;
//			}
//			fileName+=".html";
//			String contentType = URLConnection.getFileNameMap().getContentTypeFor(fileName);
//			if(tokens.length>2)
//			{
//				version = tokens[2];
//			}
//			
//			File theFile = new File(rootDirectory,fileName.substring(1, fileName.length()));
//			
//			if(theFile.canRead() && theFile.getCanonicalPath().startsWith(root))
//			{
//				int theDataLength = Files.readAllBytes(theFile.toPath()).length;
//				if(version.startsWith("HTTP/"))
//				{
//					sendHeader(writer, "HTTP/1.0 200 OK",contentType , theDataLength);
//				}
//
//			}
//		}
//		else if (method.equals("POST")) 						//POST
//		{
//			requestLine.append(reader.readLine()+'\r');			//将表单数据读取出来
//			String lists = requestLine.toString().substring(requestLine.toString().indexOf("account"), requestLine.toString().length());
//			String [] list = lists.split("&");
//			LogInfo.appendLog(list[0]);
//			LogInfo.appendLog(list[1]);
//			LogInfo.appendLog(list[2]);
//		}
//		else 													//没有实现的方法 返回501 Not Implemented
//		{
//			String body = new StringBuilder("<HTML>\r\n")
//					.append("<HEAD><TITLE>Not Implemented</TITLE>\r\n")
//					.append("<HEAD>\r\n")
//					.append("<BODY>")
//					.append("<H1>HTTP Error 501: Not Implemented</H1>\r\n")
//					.append("</BODY></HTML>\r\n").toString();
//			if(version.startsWith("HTTP/"))
//			{
//				sendHeader(writer, "HTTP/1.0 501 Not Implemented", "text/html; charset=utf-8", body.length());
//			}
//			writer.write(body);
//			writer.flush();
//		}
	}catch (IOException ex) {
		// TODO: handle exception
	}finally {
		try {
			connection.close();
		} catch (IOException e) {
			// TODO: handle exception
		}
	}
	
}
	
	private void sendHeader(Writer writer,String responseCode,String contentType,int Length) throws IOException
	{
		writer.write(responseCode+"\r\n");
		Date now = new Date();
		writer.write("Date:" + now +"\r\n");
		writer.write("Server: SQ 2.0\r\n");
		writer.write("Content-length:"+Length+"\r\n");
		writer.write("ContentType:"+contentType+"\r\n");
		writer.write("\r\n");
		writer.flush();
	}
}
