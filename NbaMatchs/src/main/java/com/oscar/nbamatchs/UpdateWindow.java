/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.oscar.nbamatchs;

import java.awt.Image;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;

import javax.imageio.ImageIO;
import javax.swing.ImageIcon;
import javax.swing.JComboBox;

import com.oscar.model.MongoController;

/**
 *
 * @author oscar
 */
public class UpdateWindow extends javax.swing.JFrame {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * Creates new form UpdateWindow
	 */
	private MongoController controller;
	private final String url_logo = "https://www.freepnglogos.com/uploads/nba-logo-png/nba-logo-png-5.png";
	public UpdateWindow() {
		this.controller = new MongoController();
		initComponents();
		try {
			team_photo_1.setIcon(new ImageIcon(new ImageIcon(ImageIO.read(new URL(this.url_logo)),"Team 1 Logo").getImage().getScaledInstance(team_photo_1.getWidth(), 
								team_photo_1.getHeight(), Image.SCALE_DEFAULT)));
			team_photo_2.setIcon(new ImageIcon(new ImageIcon(ImageIO.read(new URL(this.url_logo)),"Team 2 Logo").getImage().getScaledInstance(team_photo_2.getWidth(), 
					team_photo_2.getHeight(), Image.SCALE_DEFAULT)));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	public void insertItems(JComboBox<String> jcombo, MongoController controller) {
		List<String> lista = controller.getTeams();
		for (int i = 0; i < lista.size(); i++) {
			jcombo.addItem(lista.get(i));
		}
	}

	/**
	 * This method is called from within the constructor to initialize the form.
	 * WARNING: Do NOT modify this code. The content of this method is always
	 * regenerated by the Form Editor.
	 */
	@SuppressWarnings("unchecked")
	// <editor-fold defaultstate="collapsed" desc="Generated
	// Code">//GEN-BEGIN:initComponents
	private void initComponents() {

		team_photo_2 = new javax.swing.JLabel();
		team_photo_1 = new javax.swing.JLabel();
		result_1 = new javax.swing.JTextField();
		result_2 = new javax.swing.JTextField();
		jComboBox1 = new javax.swing.JComboBox<>();
		jComboBox2 = new javax.swing.JComboBox<>();
		player_team_1 = new javax.swing.JTextField();
		player_team_2 = new javax.swing.JTextField();
		updateButton = new javax.swing.JButton();
		nba_photo = new javax.swing.JLabel();

		setDefaultCloseOperation(javax.swing.WindowConstants.EXIT_ON_CLOSE);
		
		this.insertItems(jComboBox1, this.controller);
		this.insertItems(jComboBox2, this.controller);
		jComboBox1.addActionListener(new java.awt.event.ActionListener() {
			@Override
			public void actionPerformed(java.awt.event.ActionEvent e) {
				String route = controller.obtainThumbnail((String)jComboBox1.getSelectedItem());
				URL url;
				try {
					url = new URL(route);
					//ImageIcon icon = new ImageIcon(ImageIO.read(url),"Team 1 Logo");
					ImageIcon icon = new ImageIcon(new ImageIcon(ImageIO.read(url),"Team 1 Logo").getImage().getScaledInstance(team_photo_1.getWidth(), 
							team_photo_1.getHeight(), Image.SCALE_DEFAULT));
					team_photo_1.setIcon(icon);
					jComboBox2.removeItem(jComboBox1.getSelectedItem());
				} catch (Exception e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}
		});
		jComboBox2.addActionListener(new java.awt.event.ActionListener() {
			@Override
			public void actionPerformed(java.awt.event.ActionEvent e) {
				String route = controller.obtainThumbnail((String)jComboBox2.getSelectedItem());
				URL url;
				try {
					url = new URL(route);
					//ImageIcon icon = new ImageIcon(ImageIO.read(url),"Team 1 Logo");
					ImageIcon icon = new ImageIcon(new ImageIcon(ImageIO.read(url),"Team 2 Logo").getImage().getScaledInstance(team_photo_2.getWidth(), 
							team_photo_2.getHeight(), Image.SCALE_DEFAULT));
					team_photo_2.setIcon(icon);
					jComboBox1.removeItem(jComboBox2.getSelectedItem());
				} catch (Exception e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			}
		});

		updateButton.setText("Update");
		updateButton.addActionListener(new java.awt.event.ActionListener() {
			public void actionPerformed(java.awt.event.ActionEvent evt) {
				updateButtonActionPerformed(evt);
			}
		});

		javax.swing.GroupLayout layout = new javax.swing.GroupLayout(getContentPane());
		getContentPane().setLayout(layout);
		layout.setHorizontalGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING).addGroup(layout
				.createSequentialGroup().addContainerGap()
				.addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
						.addComponent(updateButton, javax.swing.GroupLayout.DEFAULT_SIZE,
								javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE)
						.addGroup(layout.createSequentialGroup()
								.addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.TRAILING, false)
										.addComponent(player_team_1, javax.swing.GroupLayout.Alignment.LEADING)
										.addComponent(jComboBox1, 0, 182, Short.MAX_VALUE)
										.addGroup(layout.createSequentialGroup()
												.addComponent(team_photo_1, javax.swing.GroupLayout.PREFERRED_SIZE, 90,
														javax.swing.GroupLayout.PREFERRED_SIZE)
												.addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
												.addComponent(result_1, javax.swing.GroupLayout.PREFERRED_SIZE, 80,
														javax.swing.GroupLayout.PREFERRED_SIZE)))
								.addGap(26, 26, 26)
								.addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING, false)
										.addGroup(layout.createSequentialGroup()
												.addComponent(result_2, javax.swing.GroupLayout.PREFERRED_SIZE, 78,
														javax.swing.GroupLayout.PREFERRED_SIZE)
												.addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.RELATED)
												.addComponent(team_photo_2, javax.swing.GroupLayout.PREFERRED_SIZE, 90,
														javax.swing.GroupLayout.PREFERRED_SIZE))
										.addComponent(jComboBox2, 0, javax.swing.GroupLayout.DEFAULT_SIZE,
												Short.MAX_VALUE)
										.addComponent(player_team_2))
								.addGap(0, 0, Short.MAX_VALUE)))
				.addContainerGap())
				.addGroup(javax.swing.GroupLayout.Alignment.TRAILING, layout.createSequentialGroup()
						.addContainerGap(javax.swing.GroupLayout.DEFAULT_SIZE, Short.MAX_VALUE).addComponent(nba_photo,
								javax.swing.GroupLayout.PREFERRED_SIZE, 80, javax.swing.GroupLayout.PREFERRED_SIZE)
						.addGap(154, 154, 154)));
		layout.setVerticalGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING).addGroup(layout
				.createSequentialGroup().addContainerGap()
				.addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
						.addComponent(team_photo_2, javax.swing.GroupLayout.PREFERRED_SIZE, 90,
								javax.swing.GroupLayout.PREFERRED_SIZE)
						.addComponent(team_photo_1, javax.swing.GroupLayout.PREFERRED_SIZE, 90,
								javax.swing.GroupLayout.PREFERRED_SIZE)
						.addGroup(layout.createSequentialGroup().addGap(42, 42, 42).addGroup(layout
								.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
								.addComponent(result_2, javax.swing.GroupLayout.PREFERRED_SIZE,
										javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
								.addComponent(result_1, javax.swing.GroupLayout.PREFERRED_SIZE,
										javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))))
				.addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
				.addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
						.addComponent(jComboBox1, javax.swing.GroupLayout.PREFERRED_SIZE,
								javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
						.addComponent(jComboBox2, javax.swing.GroupLayout.PREFERRED_SIZE,
								javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
				.addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
				.addGroup(layout.createParallelGroup(javax.swing.GroupLayout.Alignment.BASELINE)
						.addComponent(player_team_1, javax.swing.GroupLayout.PREFERRED_SIZE,
								javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE)
						.addComponent(player_team_2, javax.swing.GroupLayout.PREFERRED_SIZE,
								javax.swing.GroupLayout.DEFAULT_SIZE, javax.swing.GroupLayout.PREFERRED_SIZE))
				.addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED)
				.addComponent(nba_photo, javax.swing.GroupLayout.DEFAULT_SIZE, 81, Short.MAX_VALUE)
				.addPreferredGap(javax.swing.LayoutStyle.ComponentPlacement.UNRELATED).addComponent(updateButton)
				.addContainerGap()));

		pack();
	}// </editor-fold>//GEN-END:initComponents

	/**
	 * @param args the command line arguments
	 */
	public static void main(String args[]) {
		/* Set the Nimbus look and feel */
		// <editor-fold defaultstate="collapsed" desc=" Look and feel setting code
		// (optional) ">
		/*
		 * If Nimbus (introduced in Java SE 6) is not available, stay with the default
		 * look and feel. For details see
		 * http://download.oracle.com/javase/tutorial/uiswing/lookandfeel/plaf.html
		 */
		try {
			for (javax.swing.UIManager.LookAndFeelInfo info : javax.swing.UIManager.getInstalledLookAndFeels()) {
				if ("Nimbus".equals(info.getName())) {
					javax.swing.UIManager.setLookAndFeel(info.getClassName());
					break;
				}
			}
		} catch (ClassNotFoundException ex) {
			java.util.logging.Logger.getLogger(UpdateWindow.class.getName()).log(java.util.logging.Level.SEVERE, null,
					ex);
		} catch (InstantiationException ex) {
			java.util.logging.Logger.getLogger(UpdateWindow.class.getName()).log(java.util.logging.Level.SEVERE, null,
					ex);
		} catch (IllegalAccessException ex) {
			java.util.logging.Logger.getLogger(UpdateWindow.class.getName()).log(java.util.logging.Level.SEVERE, null,
					ex);
		} catch (javax.swing.UnsupportedLookAndFeelException ex) {
			java.util.logging.Logger.getLogger(UpdateWindow.class.getName()).log(java.util.logging.Level.SEVERE, null,
					ex);
		}
		// </editor-fold>

		/* Create and display the form */
		java.awt.EventQueue.invokeLater(new Runnable() {
			public void run() {
				new UpdateWindow().setVisible(true);
			}
		});
	}

	@SuppressWarnings("unused")
	private void updateButtonActionPerformed(java.awt.event.ActionEvent ext) {
		this.controller.updateTeam((String) this.jComboBox1.getSelectedItem(),
				(String) this.jComboBox2.getSelectedItem(), Integer.parseInt(this.result_1.getText()),
				Integer.parseInt(this.result_2.getText()));
		this.controller.createMatch((String) this.jComboBox1.getSelectedItem(),
				(String) this.jComboBox2.getSelectedItem(), Integer.parseInt(this.result_1.getText()),
				Integer.parseInt(this.result_2.getText()),this.player_team_1.getText(),this.player_team_2.getText());
	}
	// Variables declaration - do not modify//GEN-BEGIN:variables
	private javax.swing.JComboBox<String> jComboBox1;
	private javax.swing.JComboBox<String> jComboBox2;
	private javax.swing.JLabel nba_photo;
	private javax.swing.JTextField player_team_1;
	private javax.swing.JTextField player_team_2;
	private javax.swing.JTextField result_1;
	private javax.swing.JTextField result_2;
	private javax.swing.JLabel team_photo_1;
	private javax.swing.JLabel team_photo_2;
	private javax.swing.JButton updateButton;
	// End of variables declaration//GEN-END:variables
}
