package ex9;

import java.io.File;
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.logging.Level;
import java.util.logging.Logger;

public class JHTTP {
	
	private static final Logger logger = Logger.getLogger(JHTTP.class.getCanonicalName());          //Server Logger
	private static final int NUM_THREADS = 50;
	
	private final File rootDirectory;
	private final int port;
	
	public JHTTP(File rootDirectory, int port) throws IOException 
	{
		if(!rootDirectory.isDirectory())
		{
			throw new IOException(rootDirectory+"does not exits as a directory");      				//如果不是文件夹则抛出异常
		}
		this.rootDirectory=rootDirectory;
		this.port = port;	
	}
	
	public void start() throws IOException
	{
		ExecutorService pool = Executors.newFixedThreadPool(NUM_THREADS);							//线程池
		try(ServerSocket server = new ServerSocket(port))
		{
			logger.info("Accepting connection on port" + server.getLocalPort());
			logger.info("Document Root:"+rootDirectory);
//			LogInfo.appendLog("Accepting connection on port" + server.getLocalPort());				//服务器日志存入本地
//			LogInfo.appendLog("Document Root:"+rootDirectory);
			
			while(true)
			{
				try
				{
					Socket request = server.accept();												//request 客户端发送过来的请求
					Runnable r = new RequestProcessor(rootDirectory,request);			//创建一个线程
					pool.submit(r);																	//将线程放入线程池内跑
				}catch (IOException ex) {		
					logger.log(Level.WARNING,"Error accepting connection",ex);
				}
			}
		}
	}
	
	public static void main(String[] args) {
		File docroot;										//作为服务器的根目录
		try
		{
			docroot = new File("C:\\ex8");					
		}catch (ArrayIndexOutOfBoundsException ex) {
			System.out.println("Usage: java JHTTP");	
			return;
			// TODO: handle exception
		}
		
		int port = 80;										
		try {
			
			JHTTP webserver = new JHTTP(docroot, port);		//传入了目录和端口
			webserver.start();
		} catch (IOException ex) {
			logger.log(Level.SEVERE, "Server could not start", ex);
			// TODO: handle exception
		}
		
		
	}

}
