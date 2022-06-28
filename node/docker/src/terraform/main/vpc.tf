resource "aws_vpc" "vpc" {
  cidr_block = local.default_cidr
    tags = {
    Name = "${local.namespace}-vpc"
  }
}


resource "aws_subnet" "medisPublicSubnet" {
  vpc_id = aws_vpc.vpc.id
  cidr_block = "172.16.1.0/24"
  availability_zone = "ap-northeast-2c"
  tags = {
    Name = "${local.namespace}-public-subnet"
  }
}


resource "aws_subnet" "medisPrivateSubnet1" {
  vpc_id =aws_vpc.vpc.id
  cidr_block = "172.16.2.0/24"
  availability_zone = "ap-northeast-2c"
  tags = {
    Name = "${local.namespace}-private-subnet1"
  }
}


resource "aws_subnet" "medisPrivateSubnet2" {
  vpc_id =aws_vpc.vpc.id
  cidr_block = "172.16.3.0/24"
  availability_zone = "ap-northeast-2a"
  tags = {
    Name = "${local.namespace}-private-subnet2"
  }
}


resource "aws_internet_gateway" "medisIGW" {
  vpc_id = aws_vpc.vpc.id
  tags =  {
    Name = "${local.namespace}-igw"
  }
}

resource "aws_route_table" "medisPublicRouteTable" {
  vpc_id = aws_vpc.vpc.id

  route{
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.medisIGW.id
  }

  tags = {
    Name = "${local.namespace}-public-route-table"
  }
}
resource "aws_route_table" "medisPrivateRouteTable1" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    Name = "${local.namespace}-private-route-table1"
  } 
}

resource "aws_route_table" "medisPrivateRouteTable2" {
  vpc_id = aws_vpc.vpc.id

  tags = {
    Name = "${local.namespace}-private-route-table2"
  } 
}

resource "aws_route_table_association" "medisPublicRouteTableAssociation" {
  subnet_id = aws_subnet.medisPublicSubnet.id
  route_table_id = aws_route_table.medisPublicRouteTable.id  
}
resource "aws_route_table_association" "medisPrivateRouteTableAssociation1" {
  subnet_id = aws_subnet.medisPrivateSubnet1.id
  route_table_id = aws_route_table.medisPrivateRouteTable1.id
}
resource "aws_route_table_association" "medisPrivateRouteTableAssociation1" {
  subnet_id = aws_subnet.medisPrivateSubnet2.id
  route_table_id = aws_route_table.medisPrivateRouteTable2.id
}

resource "aws_security_group" "medisPublicSG" {
  vpc_id = aws_vpc.vpc.id
  description = "${local.namespace}-public-sg"
  ingress {
    from_port = 22                    
    to_port = 22                      
    protocol = "tcp"                  
    cidr_blocks = ["0.0.0.0/0"]       
}
  ingress {
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
}
 ingress {
    from_port = 443
    to_port = 443
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
}
  egress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    cidr_blocks     = ["0.0.0.0/0"]
  }

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "${local.namespace}-public-sg"
  }
}

resource "aws_security_group" "medisPrivateSG" {
  vpc_id = aws_vpc.vpc.id
  description = "${local.namespace}-private-sg"
  ingress {
    from_port = 3306                    
    to_port = 3306                  
    protocol = "tcp"                  
    cidr_blocks = ["0.0.0.0/0"]       
}

  egress {
    from_port       = 0
    to_port         = 0
    protocol        = "-1"
    cidr_blocks     = ["0.0.0.0/0"]
  }

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "${local.namespace}-private-sg"
  }
}