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
	
	private static final Logger logger = Logger.getLogger(JHTTP.class.getCanonicalName());
	private static final int NUM_THREADS = 50;
	private static final String INDEX_FILE = "index";
	
	private final File rootDirectory;
	private final int port;
	
	public JHTTP(File rootDirectory, int port) throws IOException {
		if(!rootDirectory.isDirectory())
		{
			throw new IOException(rootDirectory+"does not exits as a directory");      				//如果不是文件夹则抛出异常
		}
		this.rootDirectory=rootDirectory;
		this.port = port;	
	}
	
	public void start() throws IOException {
		ExecutorService pool = Executors.newFixedThreadPool(NUM_THREADS);							//线程池
		try(ServerSocket server = new ServerSocket(port))
		{
			logger.info("Accepting connection on port" + server.getLocalPort());
			logger.info("Document Root:"+rootDirectory);
			LogInfo.appendLog("Accepting connection on port" + server.getLocalPort());
			LogInfo.appendLog("Document Root:"+rootDirectory);
			
			while(true)
			{
				try
				{
					Socket request = server.accept();												//request 客户端
					Runnable r = new RequestProcessor(rootDirectory,INDEX_FILE,request);			//创建一个线程
					pool.submit(r);
				}catch (IOException ex) {
					logger.log(Level.WARNING,"Error accepting connection",ex);
				}
			}
		}
	}
	
	public static void main(String[] args) {
		File docroot;
		try
		{
			docroot = new File("C:\\ex8");					//这是一个由上个实验下载下来的网页所在的文件夹
		}catch (ArrayIndexOutOfBoundsException ex) {
			System.out.println("Usage: java JHTTP docroot port");
			return;
			// TODO: handle exception
		}
		
		int port = 80;
		try {
			
			JHTTP webserver = new JHTTP(docroot, port);
			webserver.start();
		} catch (IOException ex) {
			logger.log(Level.SEVERE, "Server could not start", ex);
			// TODO: handle exception
		}
		
		
	}

}
