/* 
 
The Liskov Substitution Principle states that subclasses should be substitutable for their base classes. 
 
This means that, given that class B is a subclass of class A, we should be able to pass an object of class B to any method 
that expects an object of class A and the method should not give any weird output in that case. 
 
 
class Rectangle 
{
	protected int width, height;

	public Rectangle() 
	{

	}

	public Rectangle(int width, int height) 
	{
		this.width = width;
		this.height = height;
	}

	public int getWidth() 
	{
		return width;
	}

	public void setWidth(int width) 
	{
		this.width = width;
	}

	public int getHeight() 
	{
		return height;
	}

	public void setHeight(int height) 
	{
		this.height = height;
	}

	public int getArea() 
	{
		return width * height;
	}
}


class Square extends Rectangle 
{
	public Square() {}

	public Square(int size) 
	{
		width = height = size;
	}

	@Override
	public void setWidth(int width) 
	{
		super.setWidth(width);
		super.setHeight(width);
	}

	@Override
	public void setHeight(int height) 
	{
		super.setHeight(height);
		super.setWidth(height);
	}
}

class Test
{

   static void getAreaTest(Rectangle r)
   {
      int width = r.getWidth();
      r.setHeight(10);
      System.out.println("Expected area of " + width + ", got " + r.getArea()); // here occurs the error
   }
	
   public static void main(String[] args) {
      Rectangle rc = new Rectangle(2, 3);
      getAreaTest(rc);

      Rectangle sq = new Square();
      sq.setWidth(5);
      getAreaTest(sq); // error
   }
}


*/


class Rectangle 
{
	protected int width, height;

	public Rectangle() 
	{

	}

	public Rectangle(int width, int height) 
	{
		this.width = width;
		this.height = height;
	}

	public int getWidth() 
	{
		return width;
	}

	public void setWidth(int width) 
	{
		this.width = width;
	}

	public int getHeight() 
	{
		return height;
	}

	public void setHeight(int height) 
	{
		this.height = height;
	}

	public int getArea() 
	{
		return width * height;
	}
}


class Square extends Rectangle 
{
	public Square() {}

	public Square(int size) 
	{
		width = height = size;
	}

	@Override
	public void setWidth(int width) 
	{
		super.setWidth(width);
		super.setHeight(width);
	}

	@Override
	public void setHeight(int height) 
	{
		super.setHeight(height);
		super.setWidth(height);
	}
}

class Test
{

   static void getAreaTest(Rectangle r)
   {
   	  r.setHeight(10);     // fixiing here
      int width = r.getWidth();
      System.out.println("Expected area of " + width + ", got " + r.getArea()); // here occurs the error
   }
	
   public static void main(String[] args) {
      Rectangle rc = new Rectangle(2, 3);
      getAreaTest(rc);

      Rectangle sq = new Square();
      sq.setWidth(5);
      getAreaTest(sq); // error
   }
}


