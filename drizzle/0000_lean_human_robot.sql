CREATE TABLE `fmr-master-app_user` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`userId` varchar(256) NOT NULL,
	`name` varchar(256),
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` timestamp ON UPDATE CURRENT_TIMESTAMP,
	`role` varchar(256),
	`email` varchar(256),
	CONSTRAINT `fmr-master-app_user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `name_idx` ON `fmr-master-app_user` (`name`);