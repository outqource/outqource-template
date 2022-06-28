

resource "aws_instance" "instance" {
  ami = "ami-0fd0765afb77bcca7"
  instance_type = "t3.medium" 
  vpc_security_group_ids =  [aws_security_group.medisPublicSG.id]

  subnet_id = aws_subnet.medisPublicSubnet.id

  key_name = var.key_name

  root_block_device {
    volume_size = 200
    volume_type = "gp3"
    delete_on_termination = true
  }

}